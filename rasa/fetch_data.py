import mysql.connector
import yaml
import logging

logging.basicConfig(level=logging.INFO)

def fetch_data():
    conn = mysql.connector.connect(
        host='106.52.158.123',
        user='gotong',
        password='Lenkso0210@',
        database='gotong'
    )
    cursor = conn.cursor()

    # Fetch intents
    cursor.execute("SELECT id, name FROM intents")
    intents = cursor.fetchall()
    logging.info(f"Fetched {len(intents)} intents.")

    # Fetch examples
    cursor.execute("SELECT intent_id, example_text FROM examples WHERE intent_id IS NOT NULL")
    examples = cursor.fetchall()
    logging.info(f"Fetched {len(examples)} examples.")

    # Fetch responses
    cursor.execute("SELECT intent_id, response_text FROM responses WHERE intent_id IS NOT NULL")
    responses = cursor.fetchall()
    logging.info(f"Fetched {len(responses)} responses.")

    # Fetch events
    cursor.execute("SELECT sender_id, type_name, intent_name, action_name FROM events")
    events = cursor.fetchall()
    logging.info(f"Fetched {len(events)} events.")

    # Fetch rules
    cursor.execute("SELECT rule_name, intent_id, action_name FROM rules WHERE intent_id IS NOT NULL")
    rules = cursor.fetchall()
    logging.info(f"Fetched {len(rules)} rules.")

    # Fetch stories
    cursor.execute("SELECT story_name, steps FROM stories")
    stories = cursor.fetchall()
    logging.info(f"Fetched {len(stories)} stories.")

    data = {
        "version": "3.1",
        "nlu": []
    }

    responses_dict = {}
    intents_dict = {intent[0]: intent[1] for intent in intents}

    for intent_id, response_text in responses:
        intent_name = intents_dict.get(intent_id)
        if not intent_name:
            logging.error(f"No matching intent found for intent_id {intent_id}")
            continue
        utter_name = f"utter_{intent_name}"
        if utter_name not in responses_dict:
            responses_dict[utter_name] = []
        responses_dict[utter_name].append({"text": response_text})

    for intent_id, example_text in examples:
        intent_name = intents_dict.get(intent_id)
        if not intent_name:
            logging.error(f"No matching intent found for intent_id {intent_id}")
            continue
        data["nlu"].append({
            "intent": intent_name,
            "examples": f"- {example_text}"
        })

    # Ensure mandatory actions are included
    mandatory_actions = ["utter_iamabot", "utter_nlu_fallback"]
    for action in mandatory_actions:
        if action not in responses_dict:
            responses_dict[action] = [{"text": f"{action} response not defined in the database."}]

    actions = list(responses_dict.keys())
    custom_action = "action_generate_response_with_gpt2"
    if custom_action not in actions:
        actions.append(custom_action)

    domain_data = {
        "version": "3.1",
        "intents": [intent[1] for intent in intents],
        "responses": responses_dict,
        "actions": actions,
        "session_config": {
            "session_expiration_time": 60,
            "carry_over_slots_to_new_session": True
        }
    }

    stories_data = {
        "version": "3.1",
        "stories": []
    }

    # Generate stories from events if available
    for story_name, steps in stories:
        steps_list = []
        for step in yaml.safe_load(steps):
            if step['type'] == 'intent':
                steps_list.append({"intent": step['name']})
            elif step['type'] == 'action':
                steps_list.append({"action": step['name']})
        stories_data["stories"].append({
            "story": story_name,
            "steps": steps_list
        })

    rules_data = {
        "version": "3.1",
        "rules": []
    }

    # Ensure consistency between stories and rules
    story_intents = {step['intent'] for story in stories_data['stories'] for step in story['steps'] if 'intent' in step}
    story_actions = {step['action'] for story in stories_data['stories'] for step in story['steps'] if 'action' in step}

    for rule_name, intent_id, action_name in rules:
        intent_name = intents_dict.get(intent_id)
        if not intent_name:
            logging.error(f"No matching intent found for intent_id {intent_id}")
            continue
        if intent_name not in story_intents and action_name not in story_actions:
            rules_data["rules"].append({
                "rule": rule_name,
                "steps": [{"intent": intent_name}, {"action": action_name}]
            })

    with open("data/nlu.yml", "w") as nlu_file:
        yaml.dump(data, nlu_file, allow_unicode=True)
    logging.info("NLU data written to data/nlu.yml")

    with open("domain.yml", "w") as domain_file:
        yaml.dump(domain_data, domain_file, allow_unicode=True)
    logging.info("Domain data written to domain.yml")

    with open("data/stories.yml", "w") as stories_file:
        yaml.dump(stories_data, stories_file, allow_unicode=True)
    logging.info("Stories data written to data/stories.yml")

    with open("data/rules.yml", "w") as rules_file:
        yaml.dump(rules_data, rules_file, allow_unicode=True)
    logging.info("Rules data written to data/rules.yml")

    cursor.close()
    conn.close()
    logging.info("Database connection closed.")

if __name__ == "__main__":
    fetch_data()

import mysql.connector
import yaml

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

    # Fetch examples
    cursor.execute("SELECT intent_id, example_text FROM examples")
    examples = cursor.fetchall()

    # Fetch responses
    cursor.execute("SELECT intent_name, response_text FROM responses")
    responses = cursor.fetchall()

    data = {
        "version": "3.1",
        "nlu": []
    }

    responses_dict = {}
    for intent_name, response_text in responses:
        if intent_name not in responses_dict:
            responses_dict[intent_name] = []
        responses_dict[intent_name].append({"text": response_text})

    intent_dict = {intent[0]: intent[1] for intent in intents}

    for intent_id, example_text in examples:
        intent_name = intent_dict[intent_id]
        data["nlu"].append({
            "intent": intent_name,
            "examples": f"- {example_text}"
        })

    data["responses"] = responses_dict

    with open("data/nlu.yml", "w") as nlu_file:
        yaml.dump(data, nlu_file, allow_unicode=True)

    cursor.close()
    conn.close()

if __name__ == "__main__":
    fetch_data()

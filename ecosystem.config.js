module.exports = {
  apps: [
    {
      name: "gotong-backend",
      script: "app.js",
      cwd: "/home/ubuntu/gotong/backend",
      env: {
        NODE_ENV: "development",
        DB_HOST: "106.52.158.123",
        DB_USER: "gotong",
        DB_PASSWORD: "Lenkso0210@",
        DB_NAME: "gotong",
        JWT_SECRET: "XU5GRme6MhEiz0pDipOYs1+w0rTfm0O3l+Vvb7qherc=",
        PORT: 5000
      },
      env_production: {
        NODE_ENV: "production",
        DB_HOST: "106.52.158.123",
        DB_USER: "gotong",
        DB_PASSWORD: "Lenkso0210@",
        DB_NAME: "gotong",
        JWT_SECRET: "XU5GRme6MhEiz0pDipOYs1+w0rTfm0O3l+Vvb7qherc=",
        PORT: 5000
      }
    },
    {
      name: "gotong-frontend",
      script: "npm",
      args: "start",
      cwd: "/home/ubuntu/gotong",  // 使用完整路径
      env: {
        NODE_ENV: "development",
        REACT_APP_API_URL: "http://106.52.158.123:5000/api",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        REACT_APP_API_URL: "http://106.52.158.123:5000/api",
        PORT: 3000
      }
    }
  ]
};

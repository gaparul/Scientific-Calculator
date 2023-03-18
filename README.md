# Scientific-Calculator
The goal of the project is to:

- Create a Scientific Calculator that supports the following operations:
    - SquareRootFunction-(√𝑥)
    - Factorial Function - (𝑥!)
    - NaturalLogarithm(base𝑒)-(ln𝑥)
    - Power Function - (𝑎𝑏 )
- Understand the entire Software Development Life Cycle on DevOps Principles

### Technology Stack used

- **Development:** React js, NPM
Scientific-calculator is a UI-based React App that uses npm to install all dependencies used to run react app.
- **Testing:** Jest
Jest is the testing framework used to test React apps.
- **Source Control Management:** GitHub
GitHub was used as the SCM tool to manage the project source code.
- **Continuous Integration:** Jenkins
Jenkins was used as the Continuous Integration (CI) tool in this project. It helps build pipelines and automate the development process
- **Containerization:** Docker, Docker Hub
    
    Docker was used for containerization in this project, allowing for easy deployment and portability of the application across different environments.
    Created Docker images were pushed to DockerHUB.
    
- **Deployment:**  Ansible, AWS EC2
Ansible was used for configuration management, pulling the Docker image, and running it on the managed host as an infrastructure as code (IAC) tool.
    
    EC2 instance was used to host our application and run the docker image on the server.
    
- **Monitoring:** ELK Stack
    
    Using a log file for monitoring and passing it on the ELK Stack.
    
This project is completely deployed using CICD and works on EC2 endpoint.
  
### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser

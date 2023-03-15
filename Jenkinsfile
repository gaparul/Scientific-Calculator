pipeline {
    agent {
        any {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    tools {nodejs "nodejs"}
     environment {
            CI = 'true'
            DOCKERHUB_CRED = credentials('CRED_DOCKER')
        }
    stages {
        stage('Git Pull') {
            steps {
                git url: 'https://github.com/gaparul/Scientific-Calculator.git', branch: 'master',
                credentialdId: 'Credential_Git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'tar czf Node.tar.gz node_modules src jenkins Jenkinsfile package.json public'
            }
        }
        stage('Test') {
            steps {
                sh 'chmod +x ./jenkins/scripts/test.sh'
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t calculator-react .'
                sh 'echo $DOCKERHUB_CRED_PSW | docker login -u $DOCKERHUB_CRED_USR --password-stdin'
            }
        }
        stage('Push Image') {
            steps {
                sh 'docker push calculator-react'
            }
        }
        // stage('Deliver') {
        //     steps {
        //         sh 'chmod +x ./jenkins/scripts/deliver.sh'
        //         sh 'chmod +x ./jenkins/scripts/kill.sh'
        //         sh './jenkins/scripts/deliver.sh'
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }

    }
}
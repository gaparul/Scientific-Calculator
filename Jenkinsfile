pipeline {
    
    agent {
        
        any {
            label 'docker'
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    
    tools {nodejs "nodejs"}
     environment {
            CI = 'true'
            registry = 'gaparul/scientific-calculator-react'
            DOCKERHUB_CRED = credentials('CRED_DOCKER')
            registryCredential = 'CRED_DOCKER'
            dockerimage = ''

        }
    stages {
        stage('Git Pull') {
            steps {
                git url: 'https://github.com/gaparul/Scientific-Calculator.git', branch: 'master',
                credentialsId: 'Credential_Git'
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
                script{
                    // docker = sh '/usr/local/bin/docker'
                    // dockerimage = docker.build registry + ":latest"
                    dockerimage = sh '/usr/local/bin/docker build -t'+registry+':latest .'
                }
                
                
            }
        }
        stage('Push Image to dockerHub') {
            steps {
                script{
                    sh '/usr/local/bin/docker login -u "gaparul" -p "Parul@191210"'
                    sh '/usr/local/bin/docker push ' +registry +':latest'
                }
                // withDockerRegistry([credentialsId: 'CRED_DOCKER', url: '']){
                //     sh '/usr/local/bin/docker push gaparul/calculator-react:latest'
                // }
                // sh 'echo $DOCKERHUB_CRED_PSW | /usr/local/bin/docker login -u $DOCKERHUB_CRED_USR --password-stdin'
                
                
            }
        }
        stage('Deploy') {
            steps {
                sh '/Users/harsh/Library/Python/3.9/bin/ansible-playbook playbook.yml -i inventory -e image_name=gaparul/scientific-calculator-react'
                // ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory',
                //  playbook: 'playbook.yml', sudoUser: null, extras: '-e "image_name=gaparul/scientific-calculator-react"'
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
pipeline{
    agent {
         label 'master'
    }
    environment {
        BRANCH_NAME = 'main'
        URL_REPO = 'git@github.com:JuanQuibar/recirculacionUNO.git'
    }

    stages{
        stage('Checkout'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github', url: "$URL_REPO"]]])
            }
        }
        stage('Build Image'){
            agent {
                label 'master'
            }
            steps{
                sh'''
                    echo "Build dockerfile + tag local image"
                    #docker build -t recirculacion:latest .
                '''

            }
        } //fin stage build image

        stage('Deploy Container'){
            agent {
                label 'master'
            }
            steps{
                echo "Correr docker compose para regenerarlo"
                /*
                sh '''
                docker-compose up --build .
                '''
                */
            }
        } //fin stage upload
        
        
        stage("Post") {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    pwd
                    echo "Clean up workfolder"
                    #rm -Rf .
                    #rm -Rf *
                '''
            }
        } //fin stage post
        
    }
}
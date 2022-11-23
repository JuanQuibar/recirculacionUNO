pipeline{
    agent {
         label 'master'
    }
    environment {
        BRANCH_NAME = 'main'
        URL_REPO = 'git@github.com:JuanQuibar/recirculacionUNO.git'
        DOCKER_HOST = "10.0.90.51"
    }

    stages{
        stage('Checkout'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github', url: "$URL_REPO"]]])
            }
        }
        stage('Build Image AND Deploy it'){
            agent {
                label 'master'
            }
            steps{
                sh'''
                    echo "Build dockerfile + tag local image"
                    sudo docker-compose up -d --build
                    #docker build -t recirculacion:latest .
                '''

            }
        } //fin stage build image        
        
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
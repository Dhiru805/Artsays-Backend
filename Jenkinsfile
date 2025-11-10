pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image for backend...'
                sh 'docker build -t artsays-backend .'
            }
        }

        stage('Run Docker Container') {
            steps {
                echo '🚀 Running Docker container for backend...'

                sh '''
                # Stop and remove old container if it exists
                if [ $(docker ps -aq -f name=artsays-backend-container) ]; then
                  docker stop artsays-backend-container || true
                  docker rm artsays-backend-container || true
                fi

                # Run new backend container
                docker run -d \
                  --name artsays-backend-container \
                  -p 3001:3001 \
                  artsays-backend
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Backend deployment completed successfully!'
        }
        failure {
            echo '❌ Backend build or deployment failed!'
        }
    }
}

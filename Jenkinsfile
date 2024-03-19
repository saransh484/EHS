@Library('sonarqubeInt') _

pipeline {
    
    agent any
   
    stages{

        stage("env test"){
            steps{
                // echo "current stats = ${current_status} and merged status = ${merged}"
                echo "skipped"
            }
        }

        stage('SonarQube Analysis') {
            
            steps{
                // echo "${current_status}"
                echo "Starting SonarQube"
                sonarqubeInt('sonar_ehs')
            }
        }
    }
}

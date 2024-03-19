@Library('sonarqubeInt') _

pipeline {
    
    agent any
   
    stages{

        stage("env test"){
            steps{
                echo "current stats = ${current_status} and merged status = ${merged}"
            }
        }

        stage('SonarQube Analysis') {
            
            when {
                  expression { return current_status == "opened" && merged == "false" }
              }
            steps{
                echo "${current_status}"
                echo "Starting SonarQube"
                sonarqubeInt()
            }
        }
    }
}

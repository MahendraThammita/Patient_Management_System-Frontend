
## Group ID:  2021S2_REG_WE_03


### Member Details

Name | Student ID | Username
--- | --- | --- 
Hirimuthugoda UJ | IT19138114 | UdithaJ  
Mahendra Thammita  | IT191203624 | MahendraThammita
Akila Liyanage  | IT19120812  | akilaliyanage
Nethsara Liyanage   | IT19188546  |  nethsaraLiyanage

### Project Description

This App was implemented for the hospital patient management system.
Patients can make appointments with doctors through the system and receptionist can manage doctors and appointments.
Each patient have a profile related to their medications.
Doctor and nurse can update and maintain the patient's profile.
Laboratary staff can keep records about patient's tests and issued drugs.
There is a chat feature for better communication between all users.


### Technologies
Frontend - `React JS`

Backend - `Node JS`

Database - `Mongo db`

Project management - `Microsoft Azure Boards`

Version control - `Git`

## How to get started with this app

### Prerequisites

1. `Node JS runtime environment `
2. `mongodb cluster`
3. `AWS S3 bucket storage `

### Procedure of setting up prerequisities and run the project

1. Run `npm install` command from Patient_Management_System-Backend directory
2. Add .env file in  Patient_Management_System-Backend directory as following:

- MONGODB_URI = your mongodb connection Uri
- ACCESS_TOKEN_SECRET_KEY= your secret key for the user authontication
- PORT = Backend server port
- AWS_S3_SK= AWS S3 Storage key
- BKT_NAME=spm-AWS S3 bucket name


3. Run `npm install` command from Patient_Management_System-Frontend directory
4. Run `npm start` command from Patient_Management_System-Backend and make sure server is up and running and database is connected
5. Run `npm start` command from Patient_Management_System-Frontend directory




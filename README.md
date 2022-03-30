# Team Helping Hand

We have tested the project on Ubuntu (Google Chrome) and MacOS (Safari). In case there's any problem with the installation, it might be because of

## To run this project :

---

1.  Clone this repo

2.  Go to the folder backend/token/node and then on the terminal , run `npm install`
3.  After installing the packages, on the terminal, run `npm start`. This is going to start the token fetching backend server. Keep it running for the project

4.  Go back to the root directory and run `npm install` again on a new terminal.

5.  Then on that terminal, run `npm start`. This will start a React App.

6.  You will be directed to /signin Page. You have to register with your google account or any other account of your choice if you don't have an account directly

7.  Our FireBaseConfig files has credentials for accessing Firebase with our account. We also have made .env files public for ease of installation and testing the webapp out. We trust the collaborators of this repository to use it fairly.

8.  After signing in, you will be re-directed to a Profile Page, where you can click on "Start Digital Human Button" and wait for a few seconds to start. You can check the console (inspect element) for any error. In case of any error, it might be because of the server being down, or backend token server not running simultaneously. Please ensure that CORS is not a hindrance while testing out this app.

9.  You can ask general questions to the Digital Human now.

## Next Plan of Action

---

We are actively trying to increase our functionalities by having more intents in dialogflow to make our bot more efficient! Also, we are going to make it a progressive web app / an android/ iOS app so that anybody can access it anywhere. We are also trying to have user location tracker with two modes, "Care Taker" and "Friend" (Patient) Mode. Right now it only supports a single User information storage, but we are going to make it Multi-User Project soon! We really believe this project to be beneficial to the people suffering from loneliness, dementia, or any other mental illness whatsoever.

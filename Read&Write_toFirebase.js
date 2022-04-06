'use strict';
const functions = require('firebase-functions');
const {google} = require('googleapis');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
const agent = new WebhookClient({ request, response });


    //FUNCTIONS FOR FIREBASE......................................................................................

    //STORING FUNCTIONS
    function GetName (agent) {
      // Get parameter from Dialogflow with the string to add to the database
      const databaseEntry = agent.parameters.person;
      // Get the database collection 'dialogflow' and document 'agent' and store
      // the document  {entry: "<value of database entry>"} in the 'agent' document
      const dialogflowAgentRef = db.collection('names').doc("name").set({"name" : databaseEntry});
      return db.runTransaction(t => {
        t.add(dialogflowAgentRef, {name: databaseEntry});
        return Promise.resolve('Write complete');
      }).then(doc => {
        console.log("Accepted");
        //agent.add(`Wrote "${databaseEntry}" to the Firestore database.`);
      }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
        //agent.add(`Failed to write "${agent.parameters}" to the Firestore database.`);
      });
    }
      
  //1
    function GetMusicType (agent) {
      const databaseEntry = agent.parameters.genre;
      const dialogflowAgentRef = db.collection('musictype').doc("musictype").set({"musictype" : databaseEntry});
      return db.runTransaction(t => {
        t.add(dialogflowAgentRef, {name: databaseEntry});
        return Promise.resolve('Write complete');
      }).then(doc => {
        console.log("Accepted");
        }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
       });
    }
    //2
	  function GetMusicArtist (agent) {
      const databaseEntry = agent.parameters.musicartist;
      const dialogflowAgentRef = db.collection('musicartist').doc("musicartist").set({"musicartist" : databaseEntry});
      return db.runTransaction(t => {
        t.add(dialogflowAgentRef, {name: databaseEntry});
        return Promise.resolve('Write complete');
      }).then(doc => {
        console.log("Accepted");
        }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
       });
    }
    //3
    function GetFavSong (agent) {
      const databaseEntry = agent.parameters.text;
      const dialogflowAgentRef = db.collection('favsong').doc("favsong").set({"favsong" : databaseEntry});
      return db.runTransaction(t => {
        t.add(dialogflowAgentRef, {name: databaseEntry});
        return Promise.resolve('Write complete');
      }).then(doc => {
        console.log("Accepted");
        }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
       });
    }
    //4
    function GetMovieType (agent){
      const databaseEntry = agent.parameters.text;
       const dialogflowAgentRef = db.collection('movietype').doc("movietype").set({"movietype" : databaseEntry});
       return db.runTransaction(t => {
         t.add(dialogflowAgentRef, {name: databaseEntry});
         return Promise.resolve('Write complete');
       }).then(doc => {
         console.log("Accepted");
         }).catch(err => {
         console.log(`Error writing to Firestore: ${err}`);
        });
    }
    //5
   function GetAllergies (agent) {
    const databaseEntry = agent.parameters.allergies;
    const dialogflowAgentRef = db.collection('getallergies').doc("getallergies").set({"getallergies" : databaseEntry});
    return db.runTransaction(t => {
      t.add(dialogflowAgentRef, {name: databaseEntry});
      return Promise.resolve('Write complete');
    }).then(doc => {
      console.log("Accepted");
      }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
     });
    }
    //6
    function GetEmergencyNumber (agent){
      const databaseEntry = agent.parameters.number;
       const dialogflowAgentRef = db.collection('enumber').doc("enumber").set({"enumber" : databaseEntry});
       return db.runTransaction(t => {
         t.add(dialogflowAgentRef, {name: databaseEntry});
         return Promise.resolve('Write complete');
       }).then(doc => {
         console.log("Accepted");
         }).catch(err => {
         console.log(`Error writing to Firestore: ${err}`);
        });
    }
    //7
    function GetEmergencyName (agent){
      const databaseEntry = agent.parameters.name;
       const dialogflowAgentRef = db.collection('ename').doc("ename").set({"ename" : databaseEntry});
       return db.runTransaction(t => {
         t.add(dialogflowAgentRef, {name: databaseEntry});
         return Promise.resolve('Write complete');
       }).then(doc => {
         console.log("Accepted");
         }).catch(err => {
         console.log(`Error writing to Firestore: ${err}`);
        });
    }
    //8
    function GetFavMemory (agent){
      const databaseEntry = agent.parameters.memory;
       const dialogflowAgentRef = db.collection('favmemory').doc("favmemory").set({"favmemory" : databaseEntry});
       return db.runTransaction(t => {
         t.add(dialogflowAgentRef, {name: databaseEntry});
         return Promise.resolve('Write complete');
       }).then(doc => {
         console.log("Accepted");
         }).catch(err => {
         console.log(`Error writing to Firestore: ${err}`);
        });
    }
    //9
   function GetFavPerson(agent){
   const databaseEntry = agent.parameters.text;
      const dialogflowAgentRef = db.collection('favperson').doc("relation").set({"favperson" : databaseEntry});
      return db.runTransaction(t => {
        t.add(dialogflowAgentRef, {name: databaseEntry});
        return Promise.resolve('Write complete');
      }).then(doc => {
        console.log("Accepted");
        }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
       });
   }
   //10
   function GetFavActor(agent){
    const databaseEntry = agent.parameters.text;
       const dialogflowAgentRef = db.collection('favactor').doc("favactor").set({"favactor" : databaseEntry});
       return db.runTransaction(t => {
         t.add(dialogflowAgentRef, {name: databaseEntry});
         return Promise.resolve('Write complete');
       }).then(doc => {
         console.log("Accepted");
         }).catch(err => {
         console.log(`Error writing to Firestore: ${err}`);
        });
    }
    //11
    function GetFavActress(agent){
      const databaseEntry = agent.parameters.text;
         const dialogflowAgentRef = db.collection('favactress').doc("favactress").set({"favactress" : databaseEntry});
         return db.runTransaction(t => {
           t.add(dialogflowAgentRef, {name: databaseEntry});
           return Promise.resolve('Write complete');
         }).then(doc => {
           console.log("Accepted");
           }).catch(err => {
           console.log(`Error writing to Firestore: ${err}`);
          });
      }

    //READING FUNCTIONS/..........................................
  function ReadName (agent) {
      // Get the database collection 'dialogflow' and document 'agent'
      const dialogflowAgentDoc = db.collection('names').doc('name');
      // Get the value of 'entry' in the document and send it to the user
      return dialogflowAgentDoc.get()
        .then(doc => {
          if (!doc.exists) {
            agent.add('No data found in the database!');
          } else {
            agent.add(doc.data().name);
          }
          return Promise.resolve('Read complete');
        }).catch(() => {
          agent.add('Error reading entry from the Firestore database.');
          agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
        });
  }
  //1
  function ReadMusicType(agent){
  // Get the database collection 'dialogflow' and document 'agent'
  const dialogflowAgentDoc = db.collection('musictype').doc('musictype');
  // Get the value of 'entry' in the document and send it to the user
  return dialogflowAgentDoc.get()
    .then(doc => {
      if (!doc.exists) {
        agent.add('No data found in the database!');
      } else {
        agent.add("Your favorite music type is " + doc.data().musictype);
      }
      return Promise.resolve('Read complete');
    }).catch(() => {
      agent.add('Error reading entry from the Firestore database.');
      agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
    });    
  }
  //2
  function ReadMusicArtist (agent) {
    const dialogflowAgentDoc = db.collection('musicartist').doc('musicartist');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite music artist is " + doc.data().musicartist);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }
  //3
  function ReadFavSong (agent) {
    const dialogflowAgentDoc = db.collection('favsong').doc('favsong');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite song is " + doc.data().favsong);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
    }
  //4
  function ReadAllergies (agent) {
    const dialogflowAgentDoc = db.collection('getallergies').doc('getallergies');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("You are allergic to " + doc.data().getallergies);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
      }
  //5
  function ReadEmergencyNumber (agent) {
    const dialogflowAgentDoc = db.collection('enumber').doc('enumber');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Given emergency number is " + doc.data().enumber);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
      }
  //6
  function ReadEmergencyName (agent) {
    const dialogflowAgentDoc = db.collection('ename').doc('ename');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
        agent.add('No data found in the database!');
      } else {
        agent.add("The emergency name save with me is " + doc.data().ename);
      }
      return Promise.resolve('Read complete');
    }).catch(() => {
      agent.add('Error reading entry from the Firestore database.');
      agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
    });
    }
  //7
  function ReadFavMemory (agent) {
    const dialogflowAgentDoc = db.collection('favmemory').doc('favmemory');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite memory is " + doc.data().favmemory);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
      }
  //8
  function ReadMovieType (agent) {
    const dialogflowAgentDoc = db.collection('movietype').doc('movietype');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite movie is " + doc.data().movietype);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
      }
  //9
  function ReadFavPerson (agent) {
    const dialogflowAgentDoc = db.collection('favperson').doc('favperson');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite person is " + doc.data().favperson);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }
  //10
  function ReadFavActor (agent) {
    const dialogflowAgentDoc = db.collection('favactor').doc('favactor');
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite actor is " + doc.data().favactor);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }
  //11
  function ReadFavActress (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('favactress').doc('favactress');
    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add("Your favorite actress is " + doc.data().favactress);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }


    //DIALOGFLOW INTENT NAMES..................................................................
    let intentMap = new Map();
    
    //Saving intentMap
      intentMap.set('GetName', GetName);
      intentMap.set('GetMusicType', GetMusicType);                  //1
  	  intentMap.set('GetMusicArtist', GetMusicArtist);              //2
  	  intentMap.set('GetFavSong',  GetFavSong);                     //3
  	  intentMap.set('GetAllergies', GetAllergies);                  //4
      intentMap.set('GetEmergencyNumber', GetEmergencyNumber);      //5
      intentMap.set('GetEmergencyName', GetEmergencyName);          //6
      intentMap.set('GetFavMemory', GetFavMemory);                  //7
      intentMap.set('GetMovieType',  GetMovieType);                 //8
      intentMap.set('GetFavPerson', GetFavPerson);                  //9
      intentMap.set('GetFavActor',GetFavActor);                     //10
      intentMap.set('GetFavActress',GetFavActress);                 //11


    //Reading intentMap
      intentMap.set('ReadName', ReadName);
      intentMap.set('ReadMusicType', ReadMusicType);                  //1
      intentMap.set('ReadMusicArtist', ReadMusicArtist);              //2
  	  intentMap.set('ReadFavSong',  ReadFavSong);                     //3
  	  intentMap.set('ReadAllergies', ReadAllergies);                  //4
      intentMap.set('ReadEmergencyNumber', ReadEmergencyNumber);      //5
      intentMap.set('ReadEmergencyName', ReadEmergencyName);          //6
      intentMap.set('ReadFavMemory', ReadFavMemory);                  //7
      intentMap.set('ReadMovieType',  ReadMovieType);                 //8
      intentMap.set('ReadFavPerson', ReadFavPerson);                  //9
      intentMap.set('ReadFavActor',ReadFavActor);                     //10
      intentMap.set('ReadFavActress',ReadFavActress);                 //11
    
      //intentMap.set('AppointmentScheduler', makeAppointment);
      agent.handleRequest(intentMap);
});
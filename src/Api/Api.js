import firebase from "../firebase.js";
import _ from "lodash";
const storage = firebase.storage();

export const fetchOne = (table, id) => {
  const promise = new Promise((resolve, reject) => {
    var databaseREF = firebase.database().ref(table).child(id);

    databaseREF.on("value", (snap) => {
      resolve(snap.val());
    });
  });

  return promise;
};

/*****READ */
export const fetchData = (table) => {
  const promise = new Promise((resolve, reject) => {
    var databaseREF = firebase.database().ref(`${table}`);

    databaseREF.on("value", (snap) => {
      resolve(snap.val());
    });
  });

  return promise;
};

/*****CREATE */
export const CreateNewDoc = (collection, data) => {
  const CollectionRef = firebase.database().ref(collection);

  CollectionRef.push(data);
};

/***DELETE */
export const deleteDoc = (collection, id) => {
  const CollectionRef = firebase.database().ref(collection).child(id);
  CollectionRef.remove();
};

/***UPDATE USER */
export const UpdateDoc = (collection, id, data) => {
  const CollectionRef = firebase.database().ref(collection).child(id);

  CollectionRef.update(data);
};

export const updateUser = (id, data, img) => {
  const CollectionRef = firebase.database().ref("users").child(id);
  const user = {
    ...data,
    photoBaby: img,
  };
  CollectionRef.update(user);
};

export const handleFireBaseUpload = async (e, imageAsFile) => {
  e.preventDefault();
  // async magic goes here...
  if (imageAsFile === "") {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  }
  console.log("imageAsFile:", imageAsFile);
  return new Promise(async (resolve, reject) => {
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    await uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            resolve((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  });
};

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title
          style="align-content: center; text-align: center"
          size="large"
        >
          <ion-img
            style="height: 50px"
            src="https://i.ibb.co/YTCZPmb/Cuplikan-layar-2021-03-28-025834.png"
          ></ion-img>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col
            style="align-content: center"
            size="12"
            :key="photo"
            v-for="photo in photos"
          >
            <ion-img
              :src="photo.webviewPath"
              @click="showActionSheet(photo)"
            ></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="bottom" slot="fixed">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-fab-button @click="takePhoto()">
                <ion-icon :icon="camera"></ion-icon>
              </ion-fab-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-button :key="photo" v-for="photo in photos" @click="submitFile(photo)" expand="block">Upload Photo</ion-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { camera, trash, close } from "ionicons/icons";
import {
  actionSheetController,
  IonPage,
  IonHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { usePhotoGallery, Photo } from "@/composables/usePhotoGallery";
import axios from "axios";
import toFile from "data-uri-to-file";

//import axios from "axios";
export default {
  name: "Tab1",
  methods: {
      /*
        Submits the file to the server
      */
      submitFile(photo: Photo){
        const dataUri = photo.webviewPath;

        toFile(dataUri).then(file => {
            console.log(file.mimeType, file.data, file.extension);

            axios.post( 'https://southeastasia.api.cognitive.microsoft.com/customvision/v3.0/Prediction/539a246e-3812-404a-87a9-30b8c5cdced7/classify/iterations/Iteration1/image',
              file,
              {
                headers: {
                    'Prediction-key' : '99ec6fab24d447dd9300e8ded9fe04ff',
                    'Content-Type': 'imageFile.type'
                }
              }
            ).then(function(){
              console.log('SUCCESS!!');
            })
            .catch(function(){
              console.log('FAILURE!!');
            });
        });
        /*
                Initialize the form data
            *

        /*
          Make the request to the POST /single-file URL
        */
      }
    },
  components: {
    IonHeader,
    IonFab,
    IonIcon,
    IonFabButton,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
  },
  setup() {
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();
    const showActionSheet = async (photo: Photo) => {
      const actionSheet = await actionSheetController.create({
        header: "Photos",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              deletePhoto(photo);
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
            handler: () => {
              // Nothing to do, action sheet is automatically closed
            },
          },
        ],
      });
      await actionSheet.present();
    };
    return {
      photos,
      takePhoto,
      showActionSheet,
      camera,
      trash,
      close,
    };
  },
};

</script>
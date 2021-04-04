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
import { defineComponent, ref } from 'vue';
import { camera, trash, close } from "ionicons/icons";
import {
  actionSheetController,
  IonPage,
  IonHeader,
  IonFab,
  IonFabButton,
  modalController,
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
import dataURLtoBlob from "@/composables/converttoBlob";
import parsePrediction from "@/composables/parsePrediction"
import axios from "axios";
import { useStore, Todo, MUTATIONS, PhotoData} from '@/store';
import Modal from '../components/Modal.vue';


export default {
  name: "Tab1",
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
    const listEl = ref();
    const store = useStore();
    const openModal = async (todo: Todo | null = null) => {
      const modal = await modalController.create({
        component: Modal,
        componentProps: { todo: { ...todo } },
      });
      return await modal.present();
    };
    const submitFile = (photo: Photo) =>{
        console.log(photo.filepath);
        console.log(photo.webviewPath);
        const fileBlob = dataURLtoBlob(photo.webviewPath);
        console.log(fileBlob);
        
        const config = {
          headers : {
            'Prediction-key':'99ec6fab24d447dd9300e8ded9fe04ff',
            'Content-Type' : 'application/octet-stream'
          }
        }
      
        axios.post("https://southeastasia.api.cognitive.microsoft.com/customvision/v3.0/Prediction/539a246e-3812-404a-87a9-30b8c5cdced7/classify/iterations/Iteration1/image", fileBlob, config).then(response => {
          console.log('response', response)
          console.log('response data : ', response.data.predictions)
          const predictionResult = parsePrediction(response.data.predictions)
          console.log(predictionResult)
          const newData = ref<PhotoData>({ age: predictionResult.age, race: predictionResult.race, gender : predictionResult.gender, height: Math.floor(Math.random() * (50 - 30 + 1)) + 30 });
          console.log(store)
          store.commit(MUTATIONS.ADD_PHOTODATA, newData.value);
          openModal()
        }).catch(error => {
          console.log('error', error)
        })
    };
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
      store,
      photos,
      takePhoto,
      defineComponent,
      openModal,
      submitFile,
      showActionSheet,
      camera,
      trash,
      close,
    };
  },
};

</script>
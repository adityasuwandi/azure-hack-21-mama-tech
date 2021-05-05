<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Baby's Data Input</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="close()">Retake Image</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="ion-padding">
    </div>
    <ion-list>
      <ion-item>
        <ion-label position="stacked">Age</ion-label>
        <ion-input v-model="localData.age"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Race</ion-label>
        <ion-input v-model="localData.race"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Gender</ion-label>
        <ion-input
          v-model="localData.gender"
          placeholder= localData.gender
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Height (in cm)</ion-label>
        <ion-input v-model="localData.height"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Weight (in kg)</ion-label>
        <ion-input
          v-model="localData.weight"
          placeholder= localData.gender
        ></ion-input>
      </ion-item>
    </ion-list>
       <ion-button @click="submitButton()" expand="block">Submit</ion-button>
  </ion-content>
</template>
<script lang="ts">
import axios from "axios";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
  modalController,
} from '@ionic/vue';
import { defineComponent, PropType, onMounted, ref } from 'vue';
import ModalResult from './ModalResult.vue';
import { useStore, Todo, MUTATIONS, PhotoData } from '@/store';
export default defineComponent({
  name: 'TodoModal',
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonButton,
  },
  props: {
    data: {
      type: Object as PropType<PhotoData>,
      default: null,
    },
  },
  setup(props) {
    
    const store = useStore();
    const isEdit = ref(false);
    const localData = ref<PhotoData>(store.state.data);
    const body = JSON.stringify({"gender":localData.value.gender.toLowerCase(),"age":localData.value.age.split(" ")[0] ,"height":localData.value.height})
    onMounted(() => {
      isEdit.value = true;
    });
    const close = () => modalController.dismiss();
    const save = () => {
      const config = {
          headers: { 
            'Content-Type': 'application/json'
          },
      }
      axios.post("https://mamatechs.azurewebsites.net/test", body, config).then(response => {
          console.log('response', response)
          console.log('response data : ', response.data)
          localData.value.zscore = response.data
        }).catch(error => {
          console.log('error', error)
        })
      console.log(localData.value)
      store.commit(MUTATIONS.ADD_PHOTODATA, localData.value);
    };
    const openModal = async (todo: Todo | null = null) => {
      const modal = await modalController.create({
        component: ModalResult,
        componentProps: { todo: { ...todo } },
      });
      return await modal.present();
    };
    const submitButton = async () =>{
      save()
      openModal()
    }

    
    
    return { close, save, localData , submitButton};
  },
});
</script>
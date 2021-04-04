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
          placeholder= ""
        ></ion-input>
      </ion-item>
    </ion-list>
       <ion-button @click="save()"  href="/tabs/tab2" expand="block">Submit</ion-button>
  </ion-content>
</template>
<script lang="ts">
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
    onMounted(() => {
      const { data } = props;
      localData.value = data;
      isEdit.value = true;
    });
    const close = () => modalController.dismiss();
    const save = () => {
      if (isEdit.value) {
        store.commit(MUTATIONS.EDIT_TODO, localData.value);
      } else {
        store.commit(MUTATIONS.ADD_TODO, localData.value);
      }
      close();
    };
    return { close, save, localData };
  },
});
</script>
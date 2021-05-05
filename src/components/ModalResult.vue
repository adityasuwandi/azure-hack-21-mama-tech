<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>Result</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-row>
        <ion-col size="6">
          <ion-item color="primary">
              <ion-label>Height</ion-label>
            </ion-item>
        </ion-col>
        <ion-col size="6">
          <ion-item color="primary">
              <ion-label>Weight</ion-label>
            </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="6" style="text-align: center">
          {{localData.height}} cm
        </ion-col>
        <ion-col size="6" style="text-align: center">
          {{localData.weight}} kg
        </ion-col>
      </ion-row>
      <ion-row>
          <ion-img
            src="https://i.ibb.co/RbZgyJY/Screenshot-2021-05-05-010339.jpg"
          ></ion-img>
      </ion-row>
      <ion-row>
        <ion-col size="4">
          <ion-list>
            <ion-list-header>

            </ion-list-header>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Wasting</ion-label>
            </ion-item>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Stunting</ion-label>
            </ion-item>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Underweight</ion-label>
            </ion-item>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Overweight</ion-label>
            </ion-item>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Edema</ion-label>
            </ion-item>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Marasmic</ion-label>
            </ion-item>
            <ion-item color="primary">
              <ion-label style="font-size: 12px">Kwashiorkor</ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
        <ion-col size="4">
          <ion-list>
            <ion-list-header style="font-size: 12px; text-align: center">
              <ion-item color="secondary">
                <ion-label>Status</ion-label>
              </ion-item>
            </ion-list-header>
            <ion-item>
              <ion-chip color="success">
                <ion-label style="font-size: 12px"><b>Normal</b></ion-label>
              </ion-chip>
            </ion-item>
            <ion-item>
              <ion-chip color="danger">
                <ion-label style="font-size: 12px"><b>Stunting</b></ion-label>
              </ion-chip>
            </ion-item>
            <ion-item>
              <ion-chip color="danger">
                <ion-label style="font-size: 12px"><b>Underweight</b></ion-label>
              </ion-chip>
            </ion-item>
            <ion-item>
              <ion-chip color="success">
                <ion-label style="font-size: 12px"><b>Normal</b></ion-label>
              </ion-chip>
            </ion-item>

            <ion-item>
              <ion-chip color="success">
                <ion-label style="font-size: 12px"><b>Normal</b></ion-label>
              </ion-chip>
            </ion-item>

            <ion-item>
              <ion-chip color="success">
                <ion-label style="font-size: 12px"><b>Normal</b></ion-label>
              </ion-chip>
            </ion-item>
            <ion-item>
              <ion-chip color="success">
                <ion-label style="font-size: 12px"><b>Normal</b></ion-label>
              </ion-chip>
            </ion-item>
          </ion-list>
        </ion-col>
        <ion-col size="4">
          <ion-list>
            <ion-list-header style="font-size: 12px">
              <ion-item color="secondary">
                Z-Score
              </ion-item>
            </ion-list-header>
            <ion-item>
              <ion-label style="font-size: 12px">0.2</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">-2.1</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">-3.5</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">-0.5</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">1.2</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">-0.8</ion-label>
            </ion-item>
            <ion-item>
              <ion-label style="font-size: 12px">-0.5</ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>

    </ion-content>
</template>
<script lang="ts">
import {
  IonContent,
  IonChip,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  modalController,
} from '@ionic/vue';
import { defineComponent, PropType, onMounted, ref } from 'vue';
import { useStore, Todo, MUTATIONS, PhotoData } from '@/store';
export default defineComponent({
  name: 'TodoModal',
  components: {
    IonContent,
    IonChip,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
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
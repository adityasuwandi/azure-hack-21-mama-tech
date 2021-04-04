<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Result</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
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
        <ion-col size="6">
          {{localData.height}}
        </ion-col>
        <ion-col size="6">
          4 kg
        </ion-col>
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
            <ion-list-header>
              Status
            </ion-list-header>
            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>
            <ion-item>
              <ion-label style="font-size: 12px">Normal</ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
        <ion-col size="4">
          <ion-list>
            <ion-list-header>
              Z-Score
            </ion-list-header>
            <ion-item>
              <ion-label style="font-size: 12px">0.2</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">0.3</ion-label>
            </ion-item>

            <ion-item>
              <ion-label style="font-size: 12px">-1</ion-label>
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
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useStore, Todo, MUTATIONS, PhotoData} from '@/store';

export default  {
  name: 'Tab2',
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
    return { localData };
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>
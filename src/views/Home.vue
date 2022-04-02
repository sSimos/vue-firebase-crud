<template>
  <div class="container-sm">
    <UserBar />
    <div class="accordion mt-2" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Add new task
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <UserCreate />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Stats
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body stats-accordion">
            <Stats />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            Tasks list
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse show "
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCreate from '@/components/UserCreate.vue'
import UserList from '@/components/UserList.vue'
import UserBar from '@/components/UserBar.vue'
import Stats from '@/components/Stats.vue'

export default {
  name: 'Home',
  components: { UserCreate, UserList, UserBar, Stats }
}
</script>

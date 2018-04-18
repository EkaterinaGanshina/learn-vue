<template v-cloak>
    <table class="table table-striped users">
        <thead>
        <tr>
            <th>№</th>
            <th>Аватарка</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Возраст</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="user.id" class="user">
            <td>{{ index + 1 }}</td>
            <td>
                <img v-if="user.pic" :src="user.pic" class="pic">
                <div v-else class="pic no-photo">no photo</div>
            </td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.age }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
  export default {
    name: "UsersList",
    props: {
      users: {
        type: Array,
        required: true
      }
    }
  };
</script>
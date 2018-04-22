<template>
    <table class="table table-striped users">
        <thead>
        <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Возраст</th>
            <th>E-mail</th>
            <th>Телефон</th>
            <th>Компания</th>
            <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id" class="user">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.company }}</td>
            <td>
                <router-link :to="`/edit/${user.id}`" tag="button" class="btn btn-default btn-sm" title="Редактировать">
                    <span class="glyphicon glyphicon-pencil"></span>
                </router-link>
            </td>
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
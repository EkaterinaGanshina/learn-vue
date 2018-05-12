<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">Телефонный справочник</h1>

            <SmartTable :url="urlGetUsers">
                <template slot="table-header">
                    <th>Пользователь</th>
                    <th>Телефон</th>
                </template>
                <template slot="table-row" slot-scope="props">
                    <td>{{ props.lastName }} {{ props.firstName }}</td>
                    <td>{{ props.phone }}</td>
                </template>
            </SmartTable>
        </div>
    </div>
</template>

<script>
export default {
  components: {
    SmartTable: () => import("@/components/SmartTable.vue")
  },
  data() {
    return {
      urlGetUsers: "/users"
    };
  }
};
</script>

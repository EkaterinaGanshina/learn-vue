<template>
    <div id="app">
        <nav id="nav" class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <router-link to="/" class="navbar-brand">Vue.js</router-link>
                </div>
                <ul class="nav navbar-nav">
                    <router-link tag="li" to="/">
                        <a>Главная</a>
                    </router-link>
                    <router-link tag="li" to="/users">
                        <a>Пользователи</a>
                    </router-link>
                    <router-link tag="li" to="/add">
                        <a>Добавить пользователя</a>
                    </router-link>
                </ul>
            </div>
        </nav>

        <div class="container">
            <div class="row">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import '../public/css/style.css';
</script>
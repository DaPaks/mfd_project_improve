<template>
    <div class="settings">
        <button class="back-arrow" @click="back"><img src="@/assets/media/arrow_white.svg" alt=""></button>
        <h1 class="settings__view__header view-header">Settings</h1>
        <section class="settings__section">
            <h3 class="settings__header">Notifications</h3>
            <ul class="settings__list">
                <li class="settings__item">Enable notifications
                    <label class="settings__switch">
                        <input class="settings__input" type="checkbox">
                        <span class="settings__slider setting__round"></span>
                    </label>
                </li>
                
                <li class="settings__item">News update
                    <label class="settings__switch">
                        <input class="settings__input" type="checkbox">
                        <span class="settings__slider setting__round"></span>
                    </label>
                </li>
                <li class="settings__item">Sound
                    <label class="settings__switch">
                        <input class="settings__input" type="checkbox">
                        <span class="settings__slider setting__round"></span>
                    </label>
                </li>
                <li class="settings__item">Vibrate
                    <label class="settings__switch">
                        <input class="settings__input" type="checkbox" checked>
                        <span class="settings__slider settings__round"></span>
                    </label>
                </li>
            </ul>
        </section>

        <section class="settings__section">
            <h3 class="settings__header">Shortcuts</h3>
            <ul class="settings__list">
                <li class="settings__item">Enable Shortcuts
                    <label class="settings__switch">
                        <input class="settings__input" type="checkbox" checked>
                        <span class="settings__slider settings__round"></span>
                    </label>
                </li>
                <li class="settings__item">Update Shortcuts</li>
                <li class="settings__item">Reset Shortcuts</li>
            </ul>
        </section>

        <section class="settings__section">
            <h3 class="settings__header">Account Actions</h3>
            <ul class="settings__list">
                <li class="settings__item">Clear Cache</li>
                <li class="settings__item">Saved Login info</li>
                <li class="settings__item">Sound
                    <label class="settings__switch">
                        <input class="settings__input" type="checkbox">
                        <span class="settings__slider round"></span>
                    </label>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>

export default {
    name: 'settingsView',
    methods: {
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped lang="scss">

</style>

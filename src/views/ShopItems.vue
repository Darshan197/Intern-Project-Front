<template>
    <Page actionBarHidden="true">
        <ScrollView>  
            <StackLayout>
                <Label v-if="user.role === 'owner'" text="Available Items" class="mt-4 text-center text-lg" />
                <Label v-if="user.role === 'customer'" :text="shop.name" class="mt-4 text-center text-lg" />
                <StackLayout>
                    <Image :src="baseURL + shop.image" class="mt-4 rounded-full w-20 h-20" stretch="aspectFill" />
                    <SearchBar id="searchBar" hint="Search" text="" clear="onClear" submit="onSubmit" />
                </StackLayout>
                <StackLayout class="mt-2 px-1">
                      <RadListView pullToRefresh="false" orientation="vertical" for="item in shop.items" height="1000px">
                        <v-template>
                            <FlexboxLayout class="mt-2 h-20">
                                <FlexboxLayout>
                                    <Image :src="item.image" class="w-32 h-16" />
                                </FlexboxLayout>
                                <FlexboxLayout class="card w-full px-2 py-1">
                                    <FlexboxLayout>
                                        <Label :text="item.name" class="text-md" />
                                    </FlexboxLayout>
                                    <FlexboxLayout class="actions">
                                        <FlexboxLayout class="card-content">
                                            <Label :text="'₹ ' + item.price" />
                                        </FlexboxLayout>
                                        <FlexboxLayout>
                                            <FlexboxLayout class="border border-green-500 px-1" @tap="addItemToCart(item)">
                                                <Label class="text-sm text-green-700 bold" text="ADD" />
                                            </FlexboxLayout>
                                            <Image v-if="user.role === 'owner'" src="~/assets/images/bin.png" class="w-4 ml-4" />
                                        </FlexboxLayout>
                                    </FlexboxLayout>
                                </FlexboxLayout>
                            </FlexboxLayout>
                        </v-template>
                    </RadListView>
                </StackLayout>
                <Button v-if="user.role === 'owner'" text="Add Item" @tap="$navigator.navigate('/additem', { frame: 'home' })" class="success" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import Vue from 'nativescript-vue'
import { baseURL } from '../bootstrap'
import RadListView from 'nativescript-ui-listview/vue';
Vue.use(RadListView);
import { mapActions, mapGetters } from 'vuex'
    export default {
        props : ['shop'],
        data() {
            return {
                baseURL: baseURL,
                message: "You have successfully authenticated. This is where you build your core application functionality."
            };
        },
        methods: {
            ...mapActions(['addItemToCart']),
            
        },
        computed: {
            user() {
                return this.$store.state.Auth.user
            },
        },
        mounted() {
            if(this.user.role === 'owner') {
                this.shop = user
            }
            if(this.user.role === 'customer') {
                this.$store.state.Cart.order.shop = this.shop._id
            }
        }
    };
</script>

<style scoped>
.icon {
    font-size: 20rem;
}
.card {
    flex-direction: column;
    justify-content: space-between;
}
.actions {
    justify-content: space-between;
    align-items: center;
}
</style>

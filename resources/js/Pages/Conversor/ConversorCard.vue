<script setup>
import { Head, usePage,useForm } from "@inertiajs/inertia-vue3";
import { onMounted, onUpdated,ref } from "vue";
import Label from "../../Jetstream/Label.vue";
import Input from "../../Jetstream/Input.vue";
import SwitchIcon from "../../Components/Icons/SwitchIcon.vue";
import Button from "../../Jetstream/Button.vue";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import axios from "axios";
import {
    countries_test,
    convert_curren_test
} from './testApi'

const form = useForm({
    from: null,
    to:null,
});
const boolConvert = ref(false)
const currencies = ref([]);
const amount = ref(null);
const convertVar = ref([])

const changeCurrency = () => {
    let temp = form.from;
    form.from = form.to;
    form.to = temp;
};

const toCurrency = () => {
    return amount.value === null || form.to === null ?
            '' :
            (amount.value * (1/convertVar.value[0])).toFixed(2) +' '+ form.to.name
}
const fromCurrency = () => {
    return amount.value === null || form.from === null ?
            '' :
            amount.value +' '+ form.from.name + ' = '
}

const validateForm = () => {
    return amount.value !== null &&
        form.from !== null && form.to !== null
}

const query = {
    apiKey: usePage().props.value.currency_convert_key
};

const convert = () => {
    const url = "https://free.currconv.com/api/v7/convert";
    let q
    q = form.from.code+'_'+form.to.code
    q += ',' + form.to.code+'_'+form.from.code
    query.q = q
    query.compact = 'ultra'


    axios
        .get(url, {params: query})
        .then(res => {
            //console.log('con',res.data);
            let data = res.data
            for (let currency in data) {
                console.log(data[currency]);
                convertVar.value.push(data[currency])
            }
            boolConvert.value = true
        })
    ;
};

const exchangeValue = () =>{

    let convertTo = '1 '+form.to.code+' = '+(1/convertVar.value[0]) + ' ' + form.from.code
    let convertFrom = '1 '+form.from.code+' = '+(1/convertVar.value[1]) + ' ' + form.to.code
    return [
        convertTo,
        convertFrom,
    ]
}

const getCurrencies = () => {
    const url = "https://free.currconv.com/api/v7/currencies";

    axios.get(url, { params: query }).then((resp) => {
        const data = resp.data.results;

        for (let currency in data) {
            let code = data[currency].id
            let name = data[currency].currencyName
            let label = code + ' - '+name
            let symbol = data[currency].currencySymbol
            currencies.value.push({
                code,label,name,symbol
            })
        }
    });
};

onUpdated(() =>{
    validateForm()
})

onMounted(() => {
    getCurrencies();
});

</script>

<template>
    <Head title="Convertidor" />
    <div
        class="
            relative
            flex
            items-top
            justify-center
            min-h-screen
            bg-gray-100
            dark:bg-gray-900
            sm:items-center sm:pt-0
        "
    >
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div
                class="
                    mt-8
                    bg-white
                    dark:bg-gray-800
                    overflow-hidden
                    shadow
                    sm:rounded-lg
                "
            >
                <div class="grid grid-cols-1 md:grid-cols-1">
                    <div class="text-center p-2">
                        <h3 class="text-3xl">Convertidor</h3>
                    </div>
                    <div class="px-6 py-3 flex gap-[25px]">
                        <div>
                            <Label for="amount" class="text-lg"> Amount </Label>
                            <Input
                                class="h-[34.39px]"
                                id="amount"
                                v-model="amount"
                                type="text"
                            />
                        </div>
                        <div>
                            <Label for="from" class="text-lg"> From </Label>
                            <v-select
                                id="from"
                                class="
                                    w-[290px]
                                    border-gray-300
                                    focus:border-indigo-300
                                    focus:ring
                                    focus:ring-indigo-200
                                    focus:ring-opacity-50
                                    rounded-md
                                    shadow-sm
                                "
                                @change="boolConvert=false"
                                v-model="form.from"
                                :options="currencies"
                            />
                        </div>
                        <div class="my-auto pt-5" @click="changeCurrency">
                            <div
                                class="
                                    border border-gray-300
                                    rounded-full
                                    my-auto
                                    p-3
                                    hover:cursor-pointer
                                "
                            >
                                <SwitchIcon class="fill-blue-700" />
                            </div>
                        </div>
                        <div>
                            <Label for="to" class="text-lg"> To </Label>
                            <v-select
                                id="to"
                                class="
                                    w-[290px]
                                    border-gray-300
                                    focus:border-indigo-300
                                    focus:ring
                                    focus:ring-indigo-200
                                    focus:ring-opacity-50
                                    rounded-md
                                    shadow-sm
                                "
                                @change="boolConvert=false"
                                v-model="form.to"
                                :options="currencies"
                            />
                        </div>
                    </div>
                    <div class="my-5">
                        <div class="text-center">
                            <Button @click="convert" :disabled="!validateForm()"> Convertir </Button>
                        </div>
                    </div>

                    <div v-if="boolConvert">
                        <div class="p-6">
                            <div class="text-gray-400 text-lg">
                                {{fromCurrency()}}
                            </div>
                            <div class="text-gray-800 text-4xl mt-[15px] ml-[25px]">
                                {{toCurrency()}}
                            </div>
                        </div>
                        <div class="p-6">
                             <div class="text-gray-400 text-lg" v-for="(item,k) in exchangeValue()" :key="k">
                                {{item}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-gray-100 {
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--tw-bg-opacity));
}
</style>

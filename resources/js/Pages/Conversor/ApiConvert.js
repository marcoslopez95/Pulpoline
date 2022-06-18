import { usePage } from "@inertiajs/inertia-vue3";
import { ref} from "vue";
import axios from "axios";

const boolConvert = ref(false)
const currencies = ref([]);
const key = usePage().props.value.currency_convert_key;
const query = {
    apiKey: key
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
            console.log('con',res.data);
            boolConvert.value = true
        })
    ;
};

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

export {
    convert,
    getCurrencies,
    currencies,
    boolConvert
}

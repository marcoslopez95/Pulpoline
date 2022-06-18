import { useForm } from "@inertiajs/inertia-vue3";
import { ref } from "vue";
const form = useForm({
    from: null,
    to:null,
});

const amount = ref(null);

const changeCurrency = () => {
    let temp = form.from;
    form.from = form.to;
    form.to = temp;
};
export {
    amount,
    form,
    changeCurrency
}


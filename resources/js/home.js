"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const body = document.querySelector("body");
const corretorRegisterForm = document.querySelector("form#corretorRegisterForm");
const corretorRegisterFormInputs = corretorRegisterForm.querySelectorAll("input[type='text']");
const editCorretorModal = document.querySelector("div#editCorretorModal");
const editCorretorModalLoadingStatus = editCorretorModal.querySelector("div.loadingStatus");
const editCorretorModalForm = editCorretorModal.querySelector("form#editCorretorModalForm");
const editCorretorFormBtn = editCorretorModal.querySelector("button#editCorretorFormBtn");
const editCorretorModalCloseBtn = editCorretorModal.querySelector("button.cancelBtn");
const editCorretorCpfInput = editCorretorModalForm.querySelector("input#editCpf");
const editCorretorCreciInput = editCorretorModalForm.querySelector("input#editCreci");
const editCorretorNameInput = editCorretorModalForm.querySelector("input#editNome");
const deleteCorretorModal = document.querySelector("div#deleteCorretorModal");
const deleteCorretorModalConfirmBtn = deleteCorretorModal.querySelector("button#deleteCorretorModalConfirmBtn");
const deleteCorretorModalCloseBtn = deleteCorretorModal.querySelector("button.btn-close");
const toastSuccess = document.querySelector("div#toast-success");
let showToast = false;
let toastSuccessTimeoutId = null;
const csrfToken = document.head.querySelector("meta[name='csrf-token']").content;
let selectedCorretorId = null;
let selectedCorretorTableRow = null;
const showError = (input, error) => {
    input.value = "";
    input.placeholder = error;
    input.classList.add("errored");
    const event = (e) => {
        input.placeholder = "";
        input.classList.remove("errored");
        input.removeEventListener("focus", event);
    };
    input.addEventListener("focus", event);
};
const checkErrors = (inputs, errors) => {
    let keys = Object.keys(errors);
    for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            if (inputs[i].name == keys[j]) {
                showError(inputs[i], errors[keys[j]][0]);
            }
        }
    }
};
const checkRegisterForm = () => {
    for (let i = 0; i < corretorRegisterFormInputs.length; i++) {
        if (corretorRegisterFormInputs[i].classList.contains("errored")) {
            const event = (e) => {
                corretorRegisterFormInputs[i].classList.remove("errored");
                corretorRegisterFormInputs[i].removeEventListener("focus", event);
            };
            corretorRegisterFormInputs[i].addEventListener("focus", event);
        }
    }
};
const toggleShowToastSuccess = (txt) => {
    let toastSuccessText = toastSuccess.querySelector("div#toastSuccessText");
    if (showToast == true) {
        toastRegister = false;
        showToast = false;
        toastSuccess.classList.add("ease-in", "opacity-100");
        toastSuccess.classList.remove("ease-out", "opacity-0", "hidden");
        toastSuccessText.innerText = txt !== null && txt !== void 0 ? txt : "";
        if (toastSuccessTimeoutId != null) {
            clearTimeout(toastSuccessTimeoutId);
        }
        toastSuccessTimeoutId = setTimeout(() => {
            toastSuccess.classList.remove("ease-in", "opacity-100");
            toastSuccess.classList.add("transition-opacity", "duration-300", "ease-out", "opacity-0", "hidden");
            toastSuccessText.innerText = "";
            toastSuccessTimeoutId = null;
        }, 2000);
    }
    else if (toastRegister != true) {
        toastSuccess.classList.remove("ease-in", "opacity-100");
        toastSuccess.classList.add("transition-opacity", "duration-300", "ease-out", "opacity-0", "hidden");
    }
};
const toggleLoadingStatus = (loadingDiv) => {
    loadingDiv.classList.toggle("loading");
};
function formatRowCpf(element) {
    console.log(element);
    let cpf = element.innerText;
    let cpfPattern = cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    element.innerText = cpfPattern;
}
const clearEditForm = () => {
    editCorretorCpfInput.value = "";
    editCorretorCreciInput.value = "";
    editCorretorNameInput.value = "";
};
const editCorretorRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    toggleLoadingStatus(editCorretorModalLoadingStatus);
    let cpf = editCorretorCpfInput.value;
    let creci = editCorretorCreciInput.value;
    let nome = editCorretorNameInput.value;
    let req;
    try {
        req = yield fetch(route("api.updateCorretor", { id: selectedCorretorId }), {
            method: "PUT",
            body: JSON.stringify({
                cpf: cpf,
                creci: creci,
                nome: nome
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    }
    catch (e) {
        return;
    }
    let res = yield req.json();
    if (req.status == 200) {
        let corretorNome = selectedCorretorTableRow.querySelector("td.corretor-nome");
        let corretorCpf = selectedCorretorTableRow.querySelector("td.corretor-cpf");
        let corretorCreci = selectedCorretorTableRow.querySelector("td.corretor-creci");
        corretorNome.innerText = res.corretor.nome;
        corretorCpf.innerText = res.corretor.cpf;
        corretorCreci.innerText = res.corretor.creci;
        showToast = true;
        toggleShowToastSuccess("Corretor editado com sucesso!");
        editCorretorModalCloseBtn.click();
    }
    if (req.status != 200) {
        checkErrors([editCorretorCpfInput, editCorretorCreciInput, editCorretorNameInput], res.errors);
    }
    toggleLoadingStatus(editCorretorModalLoadingStatus);
});
const loadCorretorData = () => __awaiter(void 0, void 0, void 0, function* () {
    toggleLoadingStatus(editCorretorModalLoadingStatus);
    let req = yield fetch(route("api.getCorretor", { id: selectedCorretorId }), {
        method: "GET",
    });
    let res = yield req.json();
    if (res.status == 200) {
        editCorretorCpfInput.value = res.corretor.cpf;
        editCorretorCpfInput.dispatchEvent(new Event("input"));
        editCorretorCreciInput.value = res.corretor.creci;
        editCorretorNameInput.value = res.corretor.nome;
    }
    else {
    }
    toggleLoadingStatus(editCorretorModalLoadingStatus);
});
function editCorretor(element) {
    let id = Number.parseInt(element.getAttribute("data-id"));
    if (id == null || Number.isNaN(id) == true) {
        return;
    }
    clearEditForm();
    selectedCorretorId = id;
    selectedCorretorTableRow = element.parentElement.parentElement;
    loadCorretorData();
}
function deleteCorretor(element) {
    let id = Number.parseInt(element.getAttribute("data-id"));
    if (id == null || Number.isNaN(id) == true) {
        return;
    }
    selectedCorretorId = id;
    selectedCorretorTableRow = element.parentElement.parentElement;
}
const deleteCorretorRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    let req;
    try {
        req = yield fetch(route("api.deleteCorretor", { id: selectedCorretorId }), {
            method: "DELETE"
        });
    }
    catch (e) {
        deleteCorretorModalCloseBtn.click();
        return;
    }
    let res = yield req.json();
    if (res.status == 200) {
        selectedCorretorTableRow.remove();
        selectedCorretorId = null;
        showToast = true;
        toggleShowToastSuccess("Corretor excluído com sucesso!");
        deleteCorretorModalCloseBtn.click();
        return;
    }
});
deleteCorretorModalConfirmBtn.addEventListener("click", (e) => {
    if (selectedCorretorId != null && selectedCorretorTableRow != null) {
        deleteCorretorRequest();
    }
});
editCorretorFormBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    editCorretorRequest();
}));
editCorretorCpfInput.addEventListener("input", (e) => {
    let cpf = e.currentTarget.value;
    let cpfPattern = cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    e.currentTarget.value = cpfPattern;
});
editCorretorModalForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
}));
toggleShowToastSuccess();
checkRegisterForm();

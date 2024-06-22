type Corretor = {
    id: number;
    nome: string;
    cpf: string;
    creci: string;
    created_at: string;
    updated_at: string;
};

/*
const createCorretorModal = document.querySelector("div#createCorretorModal") as HTMLDivElement;
const createCorretorModalLoadingStatus = createCorretorModal.querySelector("div.loadingStatus") as HTMLDivElement;
const createCorretorModalForm = createCorretorModal.querySelector("form#createCorretorModalForm") as HTMLFormElement;
const createCorretorFormBtn = createCorretorModal.querySelector("button#createCorretorFormBtn") as HTMLButtonElement;

const createCorretorCpfInput = createCorretorModalForm.querySelector("input#cpf") as HTMLInputElement;
const createCorretorCreciInput = createCorretorModalForm.querySelector("input#creci") as HTMLInputElement;
const createCorretorNameInput = createCorretorModalForm.querySelector("input#nome") as HTMLInputElement;
*/

const body = document.querySelector("body") as HTMLBodyElement;

const editCorretorModal = document.querySelector("div#editCorretorModal") as HTMLDivElement;
const editCorretorModalLoadingStatus = editCorretorModal.querySelector("div.loadingStatus") as HTMLDivElement;
const editCorretorModalForm = editCorretorModal.querySelector("form#editCorretorModalForm") as HTMLFormElement;
const editCorretorFormBtn = editCorretorModal.querySelector("button#editCorretorFormBtn") as HTMLButtonElement;
const editCorretorModalCloseBtn = editCorretorModal.querySelector("button.cancelBtn") as HTMLButtonElement;

const editCorretorCpfInput = editCorretorModalForm.querySelector("input#editCpf") as HTMLInputElement;
const editCorretorCreciInput = editCorretorModalForm.querySelector("input#editCreci") as HTMLInputElement;
const editCorretorNameInput = editCorretorModalForm.querySelector("input#editNome") as HTMLInputElement;


const deleteCorretorModal = document.querySelector("div#deleteCorretorModal") as HTMLDivElement;
const deleteCorretorModalConfirmBtn = deleteCorretorModal.querySelector("button#deleteCorretorModalConfirmBtn") as HTMLButtonElement;
const deleteCorretorModalCloseBtn = deleteCorretorModal.querySelector("button.btn-close") as HTMLButtonElement;

const toastSuccess = document.querySelector("div#toast-success") as HTMLDivElement;
let showToast = false;
let toastSuccessTimeoutId: number | null = null;

//const dismissToastSuccess = new Dismiss(toastSuccess, showToastSuccess);

const csrfToken = (document.head.querySelector("meta[name='csrf-token']") as HTMLMetaElement).content;

// transition-opacity duration-300 ease-out opacity-0 hidden



let selectedCorretorId: number | null = null;
let selectedCorretorTableRow: HTMLTableRowElement | null = null;


const toggleShowToastSuccess = (txt?: string) => {
    let toastSuccessText = toastSuccess.querySelector("div#toastSuccessText") as HTMLDivElement;

    if (showToast == true) {
        // @ts-expect-error
        toastRegister = false;
        showToast = false;
        toastSuccess.classList.add("ease-in", "opacity-100");
        toastSuccess.classList.remove("ease-out", "opacity-0", "hidden");
        toastSuccessText.innerText = txt ?? "";

        if (toastSuccessTimeoutId != null) {
            clearTimeout(toastSuccessTimeoutId);
        }

        toastSuccessTimeoutId = setTimeout(() => {
            toastSuccess.classList.remove("ease-in", "opacity-100");
            toastSuccess.classList.add("transition-opacity", "duration-300", "ease-out", "opacity-0", "hidden");
            toastSuccessText.innerText = "";
            toastSuccessTimeoutId = null;
        }, 2000);
        // @ts-expect-error
    } else if(toastRegister != true) {
        toastSuccess.classList.remove("ease-in", "opacity-100")
        toastSuccess.classList.add("transition-opacity", "duration-300", "ease-out", "opacity-0", "hidden");
    }

}

editCorretorFormBtn.addEventListener("click", async () => {
    editCorretorRequest();
});

type EditCorretorResponse = {
    corretor?: Corretor;
    status: number;
};

editCorretorModalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
});

const toggleLoadingStatus = (loadingDiv: HTMLDivElement) => {
    loadingDiv.classList.toggle("loading");
}

const clearEditForm = () => {
    editCorretorCpfInput.value = "";
    editCorretorCreciInput.value = "";
    editCorretorNameInput.value = "";
}

const editCorretorRequest = async () => {
    toggleLoadingStatus(editCorretorModalLoadingStatus);

    let cpf = editCorretorCpfInput.value;
    let creci = editCorretorCreciInput.value;
    let nome = editCorretorNameInput.value;

    // @ts-expect-error
    let req = await fetch(route("api.updateCorretor", { id: selectedCorretorId }), {
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


    let res: EditCorretorResponse = await req.json();

    if (res.status == 200) {

        let corretorNome = selectedCorretorTableRow!.querySelector("td.corretor-nome") as HTMLTableColElement;
        let corretorCpf = selectedCorretorTableRow!.querySelector("td.corretor-cpf") as HTMLTableColElement;
        let corretorCreci = selectedCorretorTableRow!.querySelector("td.corretor-creci") as HTMLTableColElement;

        corretorNome.innerText = res.corretor!.nome;
        corretorCpf.innerText = res.corretor!.cpf;
        corretorCreci.innerText = res.corretor!.creci;

        showToast = true;
        toggleShowToastSuccess("Corretor editado com sucesso!");
        editCorretorModalCloseBtn.click();
    }

    toggleLoadingStatus(editCorretorModalLoadingStatus);
}

type GetCorretorResponse = {
    corretor?: Corretor;
    status: number;
};

const loadCorretorData = async () => {
    toggleLoadingStatus(editCorretorModalLoadingStatus);

    // @ts-expect-error
    let req = await fetch(route("api.getCorretor", { id: selectedCorretorId }), {
        method: "GET",
    });

    let res: GetCorretorResponse = await req.json();

    if (res.status == 200) {
        editCorretorCpfInput.value = res.corretor!.cpf;
        editCorretorCreciInput.value = res.corretor!.creci;
        editCorretorNameInput.value = res.corretor!.nome;
    } else {

    }

    toggleLoadingStatus(editCorretorModalLoadingStatus);
}

function editCorretor(element: HTMLSpanElement) {
    let id = Number.parseInt(element.getAttribute("data-id")!);

    if (id == null && Number.isNaN(id) == true) {
        return;
    }

    clearEditForm();

    selectedCorretorId = id;
    selectedCorretorTableRow = element.parentElement!.parentElement! as HTMLTableRowElement;
    loadCorretorData();
}

function deleteCorretor(element: HTMLSpanElement) {
    let id = Number.parseInt(element.getAttribute("data-id")!);

    if (id == null || Number.isNaN(id) == true) {
        return;
    }

    selectedCorretorId = id;
    selectedCorretorTableRow = element.parentElement!.parentElement! as HTMLTableRowElement;
}


type DeleteCorretorResponse = {
    status: number;
};

const deleteCorretorRequest = async () => {
    let req: Response;

    try {
        // @ts-expect-error
        req = await fetch(route("api.deleteCorretor", { id: selectedCorretorId }), {
            method: "DELETE"
        });
    } catch (e) {
        deleteCorretorModalCloseBtn.click();
        return;
    }

    let res: DeleteCorretorResponse = await req.json();

    if (res.status == 200) {
        selectedCorretorTableRow!.remove();
        selectedCorretorId = null;
        showToast = true;
        toggleShowToastSuccess("Corretor excluído com sucesso!");
        deleteCorretorModalCloseBtn.click();
    }



}


deleteCorretorModalConfirmBtn.addEventListener("click", (e) => {
    if (selectedCorretorId != null && selectedCorretorTableRow != null) {
        deleteCorretorRequest();
    }
});

toggleShowToastSuccess();
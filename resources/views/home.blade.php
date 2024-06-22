@extends('layouts.app')

@section('content')
    <!-- <xcreateCorretorModal /> -->
    <x-editCorretorModal />
    <x-deleteCorretorModal />

    
        <script>
            let toastRegister = false;

            @if(isset($status) && $status != null)
                toastRegister = true;
            @endif
        </script>
    

    <div class="container mx-auto pt-2">

        <div id="toast-success"
            class="z-30 fixed bottom-2 right-2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert">
            <div
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div id="toastSuccessText" class="ms-3 text-sm font-normal">
                @if (isset($status) && $status != null)
                    {{ $status }}
                @endif
            </div>
            <button type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>


        <div class="my-2 flex justify-center items-center">
            <form class="w-80 md:w-96 border border-solid border-gray-600/40 rounded-md shadow-lg"
                action="{{ route('cadastrarAction') }}" method="POST">
                <h2 class="w-full py-3 mb-2 font-medium text-center bg-blue-600 text-white rounded-t-md">Cadastro de
                    Corretor
                </h2>
                @csrf
                <div class="px-2 mb-6">
                    <div>
                        <label for="createCpf"
                            class="block mb-1 text-base font-medium text-gray-900 dark:text-white">CPF</label>
                        <input type="text" max="15" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" name="cpf"
                            id="createCpf"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 @error('cpf') !border-red-700 placeholder:text-red-500 @enderror"
                            placeholder="@error('cpf'){{ $message }}@enderror" required />
                    </div>
                </div>

                <div class="px-2 mb-6">
                    <label for="creci"
                        class="block mb-1 text-base font-medium text-gray-900 dark:text-white">CRECI</label>
                    <input type="text" min="2" name="creci" id="creci"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 @error('creci') !border-red-700 placeholder:text-red-500 @enderror"
                        placeholder="@error('creci'){{ $message }}@enderror" required />
                </div>

                <div class="mb-6 px-2">
                    <label for="nome"
                        class="block mb-1 text-base font-medium text-gray-900 dark:text-white">Nome</label>
                    <input type="text" min="2" name="nome" id="nome"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 @error('nome') !border-red-700 placeholder:text-red-500 @enderror"
                        placeholder="@error('nome'){{ $message }}@enderror" required />
                </div>
                <div class="px-2 pb-2">
                    <input type="submit"
                        class="w-full py-2.5 px-5 text-center text-sm font-medium rounded-lg text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        value="Cadastrar" />
                </div>
            </form>
        </div>


        <script>
            document.getElementById('createCpf').addEventListener('input', function(e) {
                let value = e.target.value;
                let cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                    .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                    .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
                e.target.value = cpfPattern;
            });
        </script>


        <div class="relative pb-4 overflow-visible shadow-md sm:rounded-lg">
            <h2 class="flex justify-center items-center py-2 w-full text-lg bg-blue-600 text-white font-medium">Corretores Cadastrados</h2>

            <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" class="px-6 py-3">
                            CPF
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Creci
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($corretores as $corretor)
                        <x-corretorTableRow :id="$corretor->id" :nome="$corretor->nome" :cpf="$corretor->cpf" :creci="$corretor->creci" />
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <script src="{{ Vite::asset('resources/js/home.js') }}"></script>
@endsection

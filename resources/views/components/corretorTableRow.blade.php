<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ $id }}
    </th>
    <td class="corretor-nome px-6 py-4">
        {{ $nome }}
    </td>
    <td class="corretor-cpf px-6 py-4">
        {{ $cpf }}
    </td>
    <td class="corretor-creci px-6 py-4">
        {{ $creci }}
    </td>
    <td class="px-6 py-4 flex justify-evenly items-center">
        <span data-id="{{ $id }}" class="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline" onclick="editCorretor(this)" data-modal-target="editCorretorModal" data-modal-toggle="editCorretorModal">Editar</span>
        <span data-id="{{ $id }}" class="font-medium text-red-600 cursor-pointer dark:text-red-500 hover:underline" onclick="deleteCorretor(this)" data-modal-target="deleteCorretorModal" data-modal-toggle="deleteCorretorModal">Excluir</span>
    </td>
</tr>

@include('partials.header')

<div class="flex flex-col min-h-screen bg-white">

    @include('partials.navbar')


    <main class="relative flex-1 w-full">
        @yield('content')
    </main>
</div>

@include('partials.footer')

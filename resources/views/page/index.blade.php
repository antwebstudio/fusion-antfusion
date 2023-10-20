@extends('layouts.app')

@section('content')
    <form class="w-full" method="post" action="{{ $action }}">
        @csrf
        <div id="gravity" class="card max-w-6xl py-10 px-4 my-5 mx-auto">
            {{-- <antfusion-form :debug="{{ config('app.debug') ? 'true' : 'false' }}" :values='@json($formValues)' :errors='@json($errors->getMessages())' sync-dependant-field-url="{{ $syncFieldUrl }}" :fields='@json($fields)' :children='@json($children)'>
            </antfusion-form> --}}
        </div>
    </form>
@endsection

@push('js.end')
    <script>window.environment = '{{ app()->environment() }}'</script>
    <script>window.config = @json(config('fusion'))</script>
    <script src="/vendor/fusion/js/gravity.js"></script>
    <script src="/addons/AntFusion/js/app.js"></script>
    <script src="/addons/ExtendedTaxonomyFieldtype/js/app.js"></script>
    <script src="/antfusion-routes.js"></script>
    {{-- <script src="{{ theme_mix('/js/theme.js') }}"></script> --}}

    <script>
    </script>
@endpush
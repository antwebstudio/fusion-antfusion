@php
    $syncFieldUrl = route('antfusion.resource.sync_fields', ['resource' => $resource->getSlug()]);
    $meta = $resource->createMeta();
    $children = $meta['children'];
    $fields = $meta['fields'];
    $oldValues = [];
    // $oldValues = json_decode(old('_antfusion_form'), true);
    $oldValues = array_merge(old(), $oldValues ?? []);
    $formValues = array_merge($formValues ?? [], $oldValues);
@endphp

<link rel="stylesheet" href="{{ mix('css/app.css', 'addons/AntFusion') }}" media="screen" />

<antfusion-form :debug="{{ $debug ? 'true' : 'false' }}" :values='@json($formValues)' :errors='@json($errors->getMessages())' sync-dependant-field-url="{{ $syncFieldUrl }}" :fields='@json($fields)' :children='@json($children)'>
</antfusion-form>

<button class="button button--primary">Submit</button>

@once
    <script>window.environment = '{{ app()->environment() }}'</script>
    <script>window.config = @json(config('fusion'))</script>
    <script src="/vendor/fusion/js/gravity.js"></script>
    <script src="{{ mix('js/app.js', 'addons/AntFusion') }}"></script>

    <script>
        window.Fusion.booting(function(Vue, router, store) {
            router.addRoutes([
                {
                    path: '/{{ request()->path() }}',
                    meta: {
                    }
                },
            ])
        })
    </script>
@endonce
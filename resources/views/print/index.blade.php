<link rel="stylesheet" href="{{ url('addons/AntLibrary/css/print-page/style.css') }}">
<link rel="stylesheet" href="{{ url('addons/AntLibrary/css/print-page/button.css') }}">
<link rel="stylesheet" href="{{ url('addons/AntLibrary/css/print-page/pagination.css') }}">

<style>
    .stickers .sticker { 
		padding: 4mm 2mm 4mm 4mm; width: 6cm; height: 2.8cm; border: 1px #eeeeee solid; float:left; 
		/*background: url('/yellow.png');*/
	}
    @media print {
        .pagination, footer, .d-print-none { display: none; }
        .stickers .page-break {
            page-break-after:always;
            clear:both;
            margin: 0mm;
        }
		.page-start {
            clear:both;
			/*margin-top: 10mm;*/
		}
        body {
			margin-top: 0mm;
			margin-bottom: 0mm;
            margin-left: 10mm;
			margin-right: 10mm;
			/*background: url('/yellow.png');*/
        }
        thead { 
            display: table-header-group; 
        }
        tfoot { 
            display: table-footer-group; 
        }
        tr {
            page-break-inside: avoid; /* optional: prevents rows from splitting */
        }
    }
</style>
<style>
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem; /* text-sm */
        line-height: 1.25rem; /* leading-5 */
    }

    th, td {
        border: 1px solid #e5e7eb; /* border-gray-200 */
        padding: 0.75rem 1rem; /* px-4 py-3 */
        text-align: left;
    }

    th {
        background-color: #f9fafb; /* bg-gray-50 */
        font-weight: 600; /* font-semibold */
        color: #374151; /* text-gray-700 */
    }

    tr:nth-child(even) {
        background-color: #f9fafb; /* even:bg-gray-50 */
    }

    tr:hover {
        background-color: #f3f4f6; /* hover:bg-gray-100 */
    }

</style>
@if($paginate->isNotEmpty())
<script>
    window.print();
</script>
@endif

<a class="btn btn-primary d-print-none" href="javascript:window.close()">Close</a>
<table>
    <thead>
        <tr>
            @foreach($resource->printHeadings() as $handle => $header)
                <th>{{ $header }}</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
        @foreach($paginate as $model)
            <tr>
                @foreach($resource->printMap($model) as $cell)
                    <td>{{ $cell }}</td>
                @endforeach
            </tr>
        @endforeach
    </tbody>
</table>

{{ $paginate->links() }}

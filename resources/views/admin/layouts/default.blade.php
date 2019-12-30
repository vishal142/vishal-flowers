@include('admin.include.head')

@include('admin.include.header')

@include('admin.include.sidebar')

	@yield('content')

@include('admin.include.script')
	@yield('script')
	
@include('admin.include.footer')


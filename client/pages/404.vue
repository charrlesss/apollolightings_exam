<template>
	<section class="page-404">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<div class="col-sm-10 col-sm-offset-1 text-center">
						<div class="four-zero-four-bg" :style="{ 'background-image': 'url(' + image + ')' }">
							<h1 class="text-center">404</h1>
						</div>

						<div class="contant-box-404">
							<h3 class="h2">Look like you're lost</h3>

							<p>the page you are looking for not avaible!</p>

							<a href="/" class="link-404">Go to Home</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
const image = 'https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif'
</script>

<style>
.page-404 {
	padding: 40px 0;
	background: #fff;
	font-family: Arvo, serif;
}

.page-404 img {
	width: 100%;
}

.four-zero-four-bg {
	height: 400px;
	background-position: center;
}

.four-zero-four-bg h1 {
	font-size: 80px;
}

.four-zero-four-bg h3 {
	font-size: 80px;
}

.link-404 {
	color: #fff !important;
	padding: 10px 20px;
	background: #39ac31;
	margin: 20px 0;
	display: inline-block;
}

.contant-box-404 {
	margin-top: -50px;
}
</style>

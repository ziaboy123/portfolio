import { NextResponse } from 'next/server';

// The image optimizer caches by the url exactly as typed, but loads the file after
// tidying the path, so /x/../a.jpg, /./a.jpg or a.jpg%23x all fetch the same image
// and each spelling costs a fresh resize plus ~1 MB on disk. Only the plain
// spelling of a screenshot gets through, so each image has one cache entry per size.
// (Adding images somewhere else, or with other characters? Widen this.)
const PLAIN_IMAGE_URL = /^\/screenshots\/[\w-]+\.(?:jpe?g|png|webp|avif)$/;

export function proxy(request) {
  const urls = request.nextUrl.searchParams.getAll('url');
  if (urls.length !== 1 || !PLAIN_IMAGE_URL.test(urls[0])) {
    return new NextResponse('"url" parameter is not allowed', { status: 400 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/_next/image',
};

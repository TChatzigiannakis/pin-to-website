# pin-to-website

## Purpose

Sometimes you may pin a website to browse it over multiple days (e.g. because you're reading a series of articles, a long-running webcomic, etc). Occasionally, though, you may absent-mindendly use that tab to navigate to something unrelated, thus losing your progress. (And, if you're unlucky, you may not notice this until a couple of days later.)

## Usage

This extension has no user interface. You simply activate or deactivate it via the *Extensions* tab of your browser.

While the extension is active, as soon as you pin a tab, it will "lock" on whatever website it was showing at the time. Subsequently, browsing within that website will continue as normal. However, attempting to navigate away from that website will cause the extension to bring you back to the original website immediately.

For example, if you are viewing `github.com` you are allowed to go to `github.com/someuser` within that pinned tab, but you are not allowed to navigate away to `twitter.com/someuser` in the same tab (unless you temporarily unpin it).

The criterion used to determine whether two websites are different is the full hostname. Thus, if you are viewing `github.com`, then `status.github.com` will be considered a different website.

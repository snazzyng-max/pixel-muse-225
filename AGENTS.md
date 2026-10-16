<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shared site presentation uses semantic tokens and global layout utilities in src/styles.css so storefront pages stay visually consistent.
- Keep the site on existing TanStack routes; reusable product cards and the shared layout own storefront navigation and cart entry points.
- External checkout uses a shared destination constant and never clears the cart or claims payment confirmation because an outbound link cannot verify payment.

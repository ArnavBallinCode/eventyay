
## 2025-01-01 - Optimizing Collect Billing Task
**Learning:** The monthly billing collection task previously fetched organizers and then individually queried each organizer's billing and events, leading to severe N+1 database queries. We used prefetch_related for related_name="billing" and "events" which are defined on Organizer to fix it. We also ensured that the related list is evaluated using `organizer.billing.all()` instead of `.first()`.
**Action:** When iterating over top-level models that subsequently access related items and their children, always prefetch the exact paths required. Use `prefetch_related('billing__invoice_voucher', 'events')` to batch the queries. Avoid calling `.first()` on `RelatedManager` when the relation is prefetched.

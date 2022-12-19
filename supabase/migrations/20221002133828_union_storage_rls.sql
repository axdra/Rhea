insert into storage.buckets (id, name)
values ('unions', 'unions') on conflict (id) do nothing;

create policy "Union images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'unions' );

create policy "Anyone can upload a unions image."
  on storage.objects for insert
  with check ( bucket_id = 'unions' );

create policy "Only creator can update"
on storage.objects for update
using ( auth.uid() = owner );
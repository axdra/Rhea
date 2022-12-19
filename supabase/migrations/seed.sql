INSERT INTO "public"."unions" (name, description,cover_image, color, admins) VALUES ('DALO', 'Här pluggar framtidens dataloger och annat schysst folk på Mälardalens Högskola.', 'https://otsankonnriiagiluhcg.supabase.co/storage/v1/object/public/unions/c32bbb83-0732-4172-aa2c-230fad589d12','#fdd835', '{}');

INSERT INTO "public"."unionpage" ( id, sidebar ) VALUES ((SELECT id FROM "public"."unions"), '{
  "items": []
}');
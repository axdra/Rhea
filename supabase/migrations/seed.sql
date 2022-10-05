INSERT INTO "public"."unions" (name, description, color, admins) VALUES ('DALO', 'Här pluggar framtidens dataloger och annat schysst folk på Mälardalens Högskola.', '#fdd835', '{}');

INSERT INTO "public"."unionpage" ( id, sidebar ) VALUES ((SELECT id FROM "public"."unions"), '{
  "items": []
}');
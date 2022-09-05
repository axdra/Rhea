from supabase import create_client, Client

class SupabaseClient(Client):
    def __init__(self, url, anon_key, secret_key):
        super().__init__(url, anon_key, secret_key)
    
// eslint-disable-next-line turbo/no-undeclared-env-vars
export const endpoint = process.env.KRONOX_ENDPOINT || "https://webbschema.mdu.se/";

export const startTimeLookup = [
    "08:15",
    "10:15",
    "12:15",
    "14:15",
    "16:15",
    "18:15",

]
export const endTimeLookup = [
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
]


export const organizations =[
    "MDU",
    "HB",
    "HIG",
    "HKR",
    "HV",
    "KONSTFACK",
    "LTU",
    "MAU",
    "SH",
    "ORU"
]

export const organizationURL = {
    "MDU": "webbschema.mdu.se",
    "HB": "schema.hb.se",
    "HIG": "kronox.hig.se",
    "HKR": "schema.hkr.se",
    "HV": "schema.hv.se",
    "KONSTFACK": "kronox.konstfack.se",
    "LTU": "tenta.ltu.se",
    "MAU": "schema.mau.se",
    "SH": "kronox.sh.se",
    "ORU": "schema.oru.se"
}

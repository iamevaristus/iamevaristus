class AssetInstance {
    get logo() {
        return {
            white: new URL("./logo/Icon-512.png", import.meta.url).href,
            blue: new URL("./logo/BlueIcon-512.png", import.meta.url).href,
            background: new URL("./logo/background.png", import.meta.url).href,
        }
    }

    get me() {
        return {
            avatar: new URL("./me/avatar.png", import.meta.url).href,
            whoIAm: new URL("./me/whoIAm.png", import.meta.url).href,
        }
    }
}

const Assets = new AssetInstance()
export default Assets
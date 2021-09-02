export {about, welcome, guide};

const welcome = `Welcome to Click Universe game! 

Attack enemies to earn resourses.
Upgrade your ship with items from shop!
Be careful. Hitpoints life mustn't go down to 0!

Good luck!`;

const about = `Game developed by EvilYou.
Many changes and new features are planned.
Hope you will enjoy it!

Contacts: EvilYou#1118
Discord server: https://discord.gg/cZw2SAS2`;

const guide = `Attack enemies to earn resourses.
Beware of npcs from the bottom of the 
list, they are strong enough!

If hitpoints (green line) goes to 0, your 
ship will be destroyed and all progress zeroed. 

Each enemy you destroy gives you 
some amount of exp, btc and plt.
For btc and plt you can buy userful equipment 
in shop. Experience let your level grow up and 
rank too!

Guns give you more damage, so you 
kill npcs faster and get less damage from them.

Shields and ship upgrade increase your total hitpoints.`;

/* 
I published link for the game in my discord group.
Link-invitation: https://discord.gg/tshU2eTt or you can find link under any of my YT videos.

made today:
- sell option (now you can sell worse equipment and buy better (limit is 20 shields or guns))
- ship upgrade option

soon: 
- rank name and damage quantity in profile

probably (later):
- autofarm option
- warranks
- better damage animation
- menu
- quests
- more ships (need images with opacity)
- images for each npc (need images with opacity)

bugs and problems:
1. NaN / (кол-во hp и щитов). Фикс: if (isNaN(user.hp)) {local.storage.clear(); location.reload();}
2. alert в начале игры не позволяет загрузиться содержимому страницы (на телефоне). Фикс: заменить на свои модальные окна.
*/
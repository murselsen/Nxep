const { ipcRenderer } = require("electron");

$(() => {
  try {
    const elements = {
      activePageTitle: $("#activePageTitle"),
      activeProfilePageTitle: $("#activeProfilePageTitle"),
      activeSavePageTitle: $("#activeSavePageTitle"),
      activeProfileSaveDisplayName: $("#activeProfileSaveDisplayName"),
      activeProfileSaveFilePath: $("#activeProfileSaveFilePath"),
      // Save About
      aboutSaveName: $("#aboutSaveName"),
      aboutCompanyName: $("#aboutCompanyName"),
      aboutGender: $("#aboutGender"),
      aboutBrand: $("#aboutBrand"),
      aboutSaveUpdateTime: $("#aboutSaveUpdateTime"),
      // Info
      aboutSaveInfoMoney: $("#aboutSaveInfoMoney"),
      aboutSaveInfoPlayersExperience: $("#aboutSaveInfoPlayersExperience"),
      aboutSaveInfoUnlockedDealers: $("#aboutSaveInfoUnlockedDealers"),
      aboutSaveInfoUnlockedRecruitments: $(
        "#aboutSaveInfoUnlockedRecruitments"
      ),
      // Mod & Dlc List
      aboutDependencies: $("#aboutDependencies"),
    };
    let profileDisplayName = new URLSearchParams(document.location.search).get(
      "profileDisplayName"
    );
    let saveDisplayName = new URLSearchParams(document.location.search).get(
      "saveDisplayName"
    );

    if (profileDisplayName === "" || profileDisplayName === " ") {
      console.error("Request - Profile Display Name: ", profileDisplayName);
      console.error("Not Found !");
      return false;
    }
    if (saveDisplayName === "" || saveDisplayName === " ") {
      console.error("Request - Save Display Name: ", saveDisplayName);
      console.error("Not Found !");
      return false;
    }

    ipcRenderer
      .invoke("getSaveProfileData", {
        profileDisplayName: profileDisplayName,
        saveDisplayName: saveDisplayName,
      })
      .then((data) => {
        let profile = data.profile;
        let save = data.save;
        console.log("Client=", "\nProfile:", profile, "\nSave:", save);
        let profileName =
          profile.profileDetail.profile_name !== ""
            ? profile.profileDetail.profile_name
            : profile.displayName;
        let saveName =
          save.saveDetail.name === '""'
            ? save.displayName
            : save.saveDetail.name;
        document.title += "\r" + profileName + " - " + saveName;
        elements.activeProfilePageTitle.text(profileName);
        elements.activeProfilePageTitle.attr(
          "href",
          `localProfileDetailWin.html?displayName=${profile.displayName}`
        );
        elements.activeSavePageTitle.text(saveName.replaceAll('"', ""));
        elements.activeProfileSaveDisplayName.text(
          `${saveName} | ${profileName}`
        );

        elements.activeProfileSaveFilePath.text(save.path);
        elements.aboutSaveName.text(saveName);

        elements.aboutSaveUpdateTime.text(
          new Date(save.saveDetail.file_time * 1000).toLocaleString("en-GB", {
            timeZone: "UTC",
          })
        );
        elements.aboutCompanyName.text(profile.profileDetail.company_name);

        elements.aboutGender.text(
          profile.profileDetail.male ? "Erkek" : "Kadın"
        );

        elements.aboutBrand.text(
          data.trucks[profile.profileDetail.brand.toLocaleString()]
        );

        elements.aboutSaveInfoMoney.text(
          save.saveDetail.info_money_account + " TL"
        );
        elements.aboutSaveInfoPlayersExperience.text(
          save.saveDetail.info_players_experience
        );
        elements.aboutSaveInfoUnlockedDealers.text(
          save.saveDetail.info_unlocked_dealers
        );
        elements.aboutSaveInfoUnlockedRecruitments.text(
          save.saveDetail.info_unlocked_recruitments
        );
        save.saveDetail.dependencies_list.forEach((dependencies) => {
          console.log("Dependencies Item:", dependencies);
          let itemA = `
            <div href="#" class="list-group-item list-group-item-action d-flex justify-content-between">
            <span class='badge bg-primary align-self-center text-uppercase  w-px-50'>${dependencies.type.toLocaleString()}</span>
            
            <b class="mx-4 text-center">${dependencies.title}</b>
            ${
              dependencies.require == true
                ? "<span class='badge bg-danger align-self-center w-px-100'>Zorunlu</span>"
                : "<span class='badge bg-success align-self-center w-px-100'>Normal</span>"
            }
            </div>
          `;

          elements.aboutDependencies.append(itemA);
        });
        /* <a href="#" class="list-group-item list-group-item-action"> </a> */
      });
  } catch (error) {
    console.error(error);
  }
});

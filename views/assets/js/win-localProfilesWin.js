const { ipcRenderer } = require("electron");

$(() => {
  const profileTable = $("#profileTableBody");

  ipcRenderer.invoke("getProfileList", {}).then((result) => {
    console.log("Get Profile List:", result);

    _profiles = result;
    _profiles.forEach((profile) => {
      console.log("Profile:", profile);
      text = `<tr  title="${profile.displayName}">
      <td class="text-md-center text-lg-start">
        <span>${profile.profileDetail.profile_name}</span>
      </td>
      <td class="text-md-center text-lg-start">
        <span>${profile.profileDetail.male ? "Erkek" : "Kadın"}</span>
      </td>
      <td class="text-md-center text-lg-start">
        <span class="fw-bolder">${profile.profileDetail.company_name}</span>
      </td>
      <td class="text-md-center text-lg-start">
      <span>${new Date(
        profile.profileDetail.creation_time * 1000
      ).toLocaleString("en-GB", {
        timeZone: "UTC",
      })} </span>
      </td>
      <td class="text-md-center text-lg-start">
      <span>${new Date(profile.profileDetail.save_time * 1000).toLocaleString(
        "en-GB",
        {
          timeZone: "UTC",
        }
      )} </span>
      </td>

       
      <td> <a class="btn w-100 bg-gradient bg-success text-white" href="localProfileDetailWin.html?displayName=${
        profile.displayName
      }"  > <i class="text-white  bx bxs-right-arrow"></i></a></td>
      </tr>`;
      profileTable.append(text);
    });
  });
});
